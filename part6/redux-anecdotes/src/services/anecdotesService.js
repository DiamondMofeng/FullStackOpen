import axios from "axios"
import { asObject } from "../reducers/anecdoteReducer"


const baseUrl = 'http://localhost:3001'

export const getAnecdotes = async () => {
  return (await axios.get(`${baseUrl}/anecdotes`)).data
}

export const createAnecdote = async (content) => {
  return (await axios.post(`${baseUrl}/anecdotes`, asObject(content))).data.content
}

