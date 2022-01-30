
const createProduct = async (req, res) => {
    res.send("create ppro")
}


const getAllProduct = async (req, res) => {
    res.send("get all ppro")
}


const getSingleProduct = async (req, res) => {
    res.send("get single ppro")
}


const updateProduct = async (req, res) => {
    res.send("update ppro")
}

const deleteProduct = async (req, res) => {
    res.send("delete ppro")
}

const uploadImage = async (req, res) => {
    res.send("upload image")
}

module.exports = {
    createProduct, getAllProduct, getSingleProduct, deleteProduct, updateProduct, uploadImage
}