import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token =  `bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (id, blogObj) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogObj)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    await axios.delete(`${baseUrl}/${id}`, config)
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, setToken, create, updateBlog, deleteBlog }