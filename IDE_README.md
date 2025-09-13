# StacksLab Smart Contract IDE

A powerful, web-based IDE for developing Stacks smart contracts with Monaco Editor integration.

## Features

### 🎯 Core IDE Features
- **Monaco Editor Integration**: Full-featured code editor with syntax highlighting
- **Clarity Language Support**: Custom language definition with autocomplete
- **Multi-file Projects**: Organize your contracts in projects
- **Real-time Compilation**: Compile contracts with Ctrl+Enter
- **Integrated Terminal**: View compilation results and run commands
- **File Management**: Create, delete, and organize contract files

### 🔧 Editor Features
- **Syntax Highlighting**: Full Clarity language support
- **Code Completion**: Intelligent autocomplete for Clarity functions
- **Error Detection**: Real-time syntax validation
- **Code Folding**: Collapse code blocks for better navigation
- **Bracket Matching**: Automatic bracket pairing and highlighting
- **Line Numbers**: Easy code navigation
- **Minimap**: Quick file overview
- **Zoom Support**: Ctrl+Scroll to zoom in/out

### 📁 Project Management
- **Multiple Projects**: Work on multiple contracts simultaneously
- **File Explorer**: Tree view of project files
- **Tab Management**: Switch between open files easily
- **Auto-save**: Automatic file saving
- **Export/Import**: Save and share your projects

### 🔨 Compilation & Deployment
- **Smart Compilation**: Advanced syntax checking and validation
- **Error Reporting**: Detailed error messages with line numbers
- **Warning System**: Code quality suggestions
- **Deployment Ready**: Connect wallet and deploy to Stacks
- **Transaction Tracking**: Monitor deployment transactions

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save current file |
| `Ctrl+Enter` | Compile current contract |
| `Ctrl+Scroll` | Zoom in/out |
| `Ctrl+/` | Toggle line comment |
| `Ctrl+F` | Find in file |
| `Ctrl+H` | Find and replace |
| `F11` | Toggle fullscreen |

## Clarity Language Support

The IDE includes comprehensive Clarity language support:

### Syntax Highlighting
- Keywords: `define-public`, `define-private`, `define-read-only`
- Types: `uint`, `int`, `bool`, `principal`, `string-ascii`
- Functions: `ft-transfer?`, `nft-mint?`, `map-get?`
- Comments: `;;` line comments
- Literals: Numbers, strings, booleans

### Code Completion
- Function definitions with parameter placeholders
- Built-in Clarity functions
- Type annotations
- Common patterns and snippets

### Error Detection
- Syntax validation
- Bracket matching
- Type checking hints
- Best practice suggestions

## Example Contracts

The IDE comes with three example contracts:

1. **StacksLab Token** (`stackslab-token.clar`)
   - Comprehensive fungible token implementation
   - SIP-010 compliant
   - Advanced features: allowances, minting, burning, pausing

2. **StacksLab NFT** (`stackslab-nft.clar`)
   - Non-fungible token implementation
   - Metadata support
   - Operator approvals
   - Batch operations

3. **Test Contract** (`test.clar`)
   - Simple contract for testing IDE features
   - Counter and message storage
   - Batch operations example
   - Admin functions

## Terminal Commands

The integrated terminal supports these commands:

- `help` - Show available commands
- `clear` - Clear terminal output
- `compile` - Compile active file
- `deploy` - Deploy contract (requires wallet)
- `test` - Run tests (coming soon)

## Getting Started

1. **Create a New Project**: Click the folder+ icon in the explorer
2. **Add Files**: Click the + icon to create new `.clar` files
3. **Write Code**: Use the Monaco editor with full Clarity support
4. **Compile**: Press `Ctrl+Enter` or click the Compile button
5. **Deploy**: Connect your wallet and click Deploy

## Advanced Features

### Project Export/Import
- Export projects as JSON files
- Share projects with team members
- Backup your work locally

### Wallet Integration
- Connect Stacks wallets
- Deploy contracts directly from IDE
- Transaction monitoring
- Network switching (mainnet/testnet)

### Customization
- Adjustable panel sizes
- Theme support (dark mode default)
- Font size controls
- Layout preferences

## Tips for Best Results

1. **Use Comments**: Document your code with `;;` comments
2. **Follow Naming Conventions**: Use kebab-case for function names
3. **Test Frequently**: Compile often to catch errors early
4. **Organize Code**: Use consistent indentation and spacing
5. **Leverage Autocomplete**: Use Ctrl+Space for suggestions

## Troubleshooting

### Common Issues
- **Editor not loading**: Check browser console for errors
- **Compilation fails**: Verify syntax and bracket matching
- **Wallet not connecting**: Ensure wallet extension is installed
- **Files not saving**: Check browser storage permissions

### Performance Tips
- Close unused tabs to improve performance
- Use the minimap for large files
- Enable code folding for complex contracts
- Clear terminal output regularly

## Browser Support

The IDE works best in modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

The StacksLab IDE is built with:
- Next.js 15
- React 19
- Monaco Editor
- TypeScript
- Tailwind CSS

For development setup and contribution guidelines, see the main project README.