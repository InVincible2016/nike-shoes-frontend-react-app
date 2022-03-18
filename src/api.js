function getShoePrice(shoeId) {
    return fetch(`/api/shoe-price/${shoeId}`)
    .then((response) => response.json())
}

export {
    getShoePrice
}