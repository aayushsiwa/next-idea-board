function generateUniqueId(length = 8) {
    return Array.from(crypto.getRandomValues(new Uint8Array(length * 2)))
        .map((byte) => byte.toString(36))
        .join("")
        .replace(/\d/g, "")
        .slice(0, length);
}

// console.log(generateUniqueId());

export default generateUniqueId;
