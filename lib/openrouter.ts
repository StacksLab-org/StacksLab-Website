// OpenRouter.ai API integration for AI debugging
export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenRouterResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class OpenRouterAPI {
  private apiKey: string
  private baseURL = 'https://openrouter.ai/api/v1/chat/completions'
  private defaultModel = 'anthropic/claude-3.5-sonnet'
  private fallbackModel = 'anthropic/claude-3-haiku'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async debugContract(contractCode: string, fileName: string, useFallback: boolean = false): Promise<string> {
    const systemPrompt = `You are an expert Clarity smart contract auditor and debugger. Analyze the provided Clarity smart contract code and provide a comprehensive debugging report.

Focus on:
1. Security vulnerabilities and potential exploits
2. Logic errors and edge cases
3. Gas optimization opportunities
4. Best practices violations
5. Code quality and maintainability issues
6. Potential runtime errors
7. Access control issues
8. Input validation problems
9. State management concerns
10. Integration risks

Provide specific line references where possible and suggest concrete fixes. Format your response as a detailed debugging report with clear sections and actionable recommendations.`

    const userPrompt = `Please analyze this Clarity smart contract for bugs, vulnerabilities, and improvements:

File: ${fileName}

\`\`\`clarity
${contractCode}
\`\`\`

Provide a comprehensive debugging analysis with specific issues found and recommended fixes.`

    const messages: OpenRouterMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'StacksLab IDE'
        },
        body: JSON.stringify({
          model: useFallback ? this.fallbackModel : this.defaultModel,
          messages,
          temperature: 0.1,
          max_tokens: useFallback ? 1500 : 2000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error?.message || response.statusText
        
        // Handle specific error types
        if (response.status === 402) {
          throw new Error(`Insufficient credits: ${errorMessage}`)
        } else if (response.status === 429) {
          throw new Error(`Rate limit exceeded: ${errorMessage}`)
        } else if (response.status === 401) {
          throw new Error(`Invalid API key: ${errorMessage}`)
        } else {
          throw new Error(`OpenRouter API error: ${response.status} - ${errorMessage}`)
        }
      }

      const data: OpenRouterResponse = await response.json()
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from AI model')
      }

      return data.choices[0].message.content
    } catch (error) {
      console.error('OpenRouter API Error:', error)
      throw error
    }
  }

  async quickAnalysis(contractCode: string): Promise<string> {
    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: 'You are a Clarity smart contract analyzer. Provide a quick security and quality analysis in 3-5 bullet points.'
      },
      {
        role: 'user',
        content: `Quickly analyze this Clarity contract for major issues:\n\n\`\`\`clarity\n${contractCode}\n\`\`\``
      }
    ]

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'StacksLab IDE'
        },
        body: JSON.stringify({
          model: this.defaultModel,
          messages,
          temperature: 0.1,
          max_tokens: 500,
          top_p: 1
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data: OpenRouterResponse = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('Quick Analysis Error:', error)
      throw error
    }
  }
}

// Singleton instance
let openRouterInstance: OpenRouterAPI | null = null

export const getOpenRouterAPI = (apiKey?: string): OpenRouterAPI => {
  if (!openRouterInstance && apiKey) {
    openRouterInstance = new OpenRouterAPI(apiKey)
  }
  
  if (!openRouterInstance) {
    throw new Error('OpenRouter API not initialized. Please provide an API key.')
  }
  
  return openRouterInstance
}

export const initializeOpenRouter = (apiKey: string): void => {
  openRouterInstance = new OpenRouterAPI(apiKey)
}