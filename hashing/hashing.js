// @ts-check
"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	Blockchain.blocks.push(createBlock(line));
}

console.log(Blockchain);
console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************


function blockHash(bl) {
	return crypto.createHash("sha256").update(
		JSON.stringify(bl)
	).digest("hex");
}


function createBlock(data) {
	const block = {
		index: Blockchain.blocks.length,
		data,
		timestamp: Date.now(),
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
	};
	block.hash = blockHash(block);

	return block;
}


function verifyChain(blockchain) {
	if (blockchain.blocks?.length === 0) {
		return false;
	}

	let res = false;
	for (const block of blockchain.blocks) {
		if (block.index === 0) {
			res = verifyGenesis(block);
		} else {
			res = block.prevHash !== "" && verifyHash(block) && block.prevHash === blockchain.blocks[block.index - 1].hash;
		}

	}
	return res;
}

function verifyGenesis(block) {
	return block.hash === "000000";
}


function verifyHash(block) {
	let _block = Object.assign({}, block);
	delete _block.hash;
	return block.hash === blockHash(_block)
}

