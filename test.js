const ethers = require('ethers');
const axios = require('axios')

let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
console.log(id)


// const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
// eventName = 'Transfer(address,address,uint256)';
// // Generate the keccak256 hash of the eventName
// const eventNameHash = ethers.keccak256(ethers.toUtf8Bytes(eventName));
// console.log(eventNameHash)

// const address = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
// // Fetch the contract ABI from Etherscan
// axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${etherscanApiKey}`)
// .then(response => {
//     if (response.data.status !== "1") {
//         console.error('Error fetching contract ABI from Etherscan.');
//         return;
//     }
    
//     const abi = JSON.parse(response.data.result);
//     const contractInterface = new ethers.Interface(abi);
//     const fragments = contractInterface.fragments;

//     const eventSignatures = fragments.filter(fragment => fragment.type === 'event').map(fragment => {
//         const inputTypes = fragment.inputs.map(input => input.type);
//         const eventSignature = `${fragment.name}(${inputTypes.join(',')})`;
//         return eventSignature;
//     });
// })
