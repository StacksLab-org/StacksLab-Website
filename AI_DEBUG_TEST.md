# StacksLab AI Debugger Test Guide

## AI-Powered Smart Contract Debugging with Claude Sonnet

### Overview
The AI Debugger uses OpenRouter.ai with Claude Sonnet to provide comprehensive smart contract analysis, vulnerability detection, and code quality improvements.

### Setup Instructions

#### 1. Get OpenRouter API Key
1. Visit [OpenRouter.ai](https://openrouter.ai/keys)
2. Create an account or sign in
3. Generate a new API key
4. Copy the key (starts with `sk-or-`)

#### 2. Configure API Key in IDE
1. Open StacksLab IDE (`/dashboard/contracts`)
2. Click the **Settings** button (⚙️) in the toolbar
3. Enter your OpenRouter API key
4. Click **Save**

### Testing the AI Debugger

#### Test 1: Basic AI Debugging
1. Open any contract file (e.g., `stackslab-token.clar`)
2. Click the **AI Debug** button (✨) in the toolbar
3. Watch the terminal for real-time analysis progress
4. Review the comprehensive debugging report

#### Test 2: Keyboard Shortcut
1. Select a contract file
2. Press `Ctrl+Shift+D`
3. Verify AI debugging starts automatically

#### Test 3: Error Handling
1. Try debugging without API key - should show error message
2. Try debugging empty file - should show validation error
3. Try debugging while compilation is running - should show warning

#### Test 4: Different Contract Types
Test with various contract types:
- **Token Contract**: `stackslab-token.clar`
- **NFT Contract**: `stackslab-nft.clar`
- **Simple Contract**: `test.clar`

### Expected AI Analysis Features

#### Security Analysis
- ✅ Access control vulnerabilities
- ✅ Reentrancy attack vectors
- ✅ Integer overflow/underflow risks
- ✅ Input validation issues
- ✅ Authorization bypass attempts

#### Code Quality Review
- ✅ Best practices compliance
- ✅ Gas optimization opportunities
- ✅ Code maintainability issues
- ✅ Error handling patterns
- ✅ Documentation quality

#### Logic Verification
- ✅ Business logic errors
- ✅ Edge case handling
- ✅ State management issues
- ✅ Function interaction problems
- ✅ Data consistency checks

### Sample AI Debug Output

```
🤖 Starting AI debugging for stackslab-token.clar...
🔍 Analyzing contract with Claude Sonnet...
📊 Contract size: 4567 characters
🧠 Sending to OpenRouter.ai...
✅ AI debugging completed!
📋 AI Debugging Report for stackslab-token.clar:
==================================================

## Security Analysis

✅ Access control properly implemented with contract-owner checks
⚠️  Consider adding a two-step ownership transfer mechanism
❌ Missing pause functionality validation in some functions

## Code Quality

✅ Good error constant definitions
✅ Proper use of asserts! for validation
⚠️  Consider adding more descriptive error messages

## Gas Optimization

💡 Use map-get? with default-to pattern is efficient
💡 Consider batching operations where possible

## Best Practices

✅ SIP-010 compliance maintained
✅ Proper use of response types
⚠️  Add more comprehensive documentation

==================================================
🎉 AI debugging analysis complete!
💡 Review the suggestions above to improve your contract
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+D` | Start AI debugging |
| `Ctrl+Enter` | Compile contract |
| `Ctrl+S` | Save file |

### Troubleshooting

#### Common Issues

**"OpenRouter API key required"**
- Solution: Add your API key in IDE Settings

**"API quota exceeded"**
- Solution: Check your OpenRouter account billing

**"AI debugging failed: Network error"**
- Solution: Check internet connection and try again

**"No response from AI model"**
- Solution: Try again or check OpenRouter service status

#### API Key Security
- ✅ Keys stored locally in browser only
- ✅ Never sent to StacksLab servers
- ✅ Direct communication with OpenRouter.ai
- ✅ Can be removed anytime from settings

### Advanced Features

#### Model Configuration
- **Default Model**: `anthropic/claude-3.5-sonnet`
- **Temperature**: 0.1 (focused, deterministic responses)
- **Max Tokens**: 4000 (comprehensive analysis)
- **Context**: Clarity-specific prompting

#### Analysis Depth
- **Security**: Vulnerability scanning and exploit detection
- **Performance**: Gas optimization and efficiency analysis
- **Quality**: Code style and maintainability review
- **Logic**: Business logic verification and edge cases

### Integration Benefits

#### Developer Workflow
1. **Write** contract code in Monaco Editor
2. **Compile** with built-in Clarity compiler
3. **Debug** with AI-powered analysis
4. **Deploy** to Stacks network
5. **Monitor** with integrated tools

#### AI-Enhanced Development
- **Real-time Feedback**: Instant analysis results
- **Expert Knowledge**: Claude Sonnet's deep understanding
- **Comprehensive Coverage**: Security + Quality + Performance
- **Actionable Insights**: Specific fixes and improvements

### Performance Metrics

#### Analysis Speed
- **Small Contracts** (<1KB): ~5-10 seconds
- **Medium Contracts** (1-5KB): ~10-20 seconds
- **Large Contracts** (>5KB): ~20-30 seconds

#### Accuracy
- **Security Issues**: High detection rate
- **False Positives**: Minimal with Claude Sonnet
- **Code Quality**: Comprehensive coverage
- **Best Practices**: Industry-standard recommendations

### Future Enhancements

#### Planned Features
- [ ] Custom analysis templates
- [ ] Integration with testing frameworks
- [ ] Automated fix suggestions
- [ ] Multi-file project analysis
- [ ] Historical analysis tracking

#### Model Options
- [ ] GPT-4 integration option
- [ ] Specialized Clarity models
- [ ] Custom fine-tuned models
- [ ] Local model support

The AI Debugger represents a significant advancement in smart contract development, providing developers with expert-level analysis and recommendations powered by state-of-the-art AI technology.