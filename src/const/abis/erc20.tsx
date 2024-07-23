export const erc20_abi = [
    {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8"
            }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            }
        ],
        name: "approve",
        outputs: [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    }
]
