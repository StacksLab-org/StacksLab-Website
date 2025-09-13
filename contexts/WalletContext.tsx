'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface WalletState {
  isConnected: boolean
  address: string | null
  network: 'mainnet' | 'testnet'
  balance: string | null
}

interface WalletContextType {
  wallet: WalletState
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: (network: 'mainnet' | 'testnet') => void
  isLoading: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: 'testnet',
    balance: null
  })
  const [isLoading, setIsLoading] = useState(false)

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      // Check if Hiro Wallet or Xverse is available
      if (typeof window !== 'undefined' && (window as any).StacksProvider) {
        const provider = (window as any).StacksProvider
        const userData = await provider.getProductInfo()
        if (userData) {
          // Wallet is connected, get user data
          const address = localStorage.getItem('stacks-wallet-address')
          if (address) {
            setWallet(prev => ({
              ...prev,
              isConnected: true,
              address: address,
              balance: '0.00 STX' // Mock balance for now
            }))
          }
        }
      }
    } catch (error) {
      console.log('No wallet connected')
    }
  }

  const connectWallet = async () => {
    setIsLoading(true)
    try {
      // Check if Stacks wallet is available
      if (typeof window !== 'undefined') {
        // Try Hiro Wallet first
        if ((window as any).StacksProvider) {
          const provider = (window as any).StacksProvider
          const userData = await provider.requestAccounts()
          
          if (userData && userData.length > 0) {
            const address = userData[0]
            localStorage.setItem('stacks-wallet-address', address)
            
            setWallet(prev => ({
              ...prev,
              isConnected: true,
              address: address,
              balance: '0.00 STX' // Mock balance
            }))
          }
        } else {
          // Fallback: Mock connection for development
          const mockAddress = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7'
          localStorage.setItem('stacks-wallet-address', mockAddress)
          
          setWallet(prev => ({
            ...prev,
            isConnected: true,
            address: mockAddress,
            balance: '100.50 STX' // Mock balance
          }))
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      // For development, still allow mock connection
      const mockAddress = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7'
      localStorage.setItem('stacks-wallet-address', mockAddress)
      
      setWallet(prev => ({
        ...prev,
        isConnected: true,
        address: mockAddress,
        balance: '100.50 STX'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    localStorage.removeItem('stacks-wallet-address')
    setWallet({
      isConnected: false,
      address: null,
      network: 'testnet',
      balance: null
    })
  }

  const switchNetwork = (network: 'mainnet' | 'testnet') => {
    setWallet(prev => ({
      ...prev,
      network
    }))
  }

  const value: WalletContextType = {
    wallet,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    isLoading
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

export default WalletContext