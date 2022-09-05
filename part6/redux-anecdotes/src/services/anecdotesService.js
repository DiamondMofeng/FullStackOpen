import axios from "axios"
import { asObject } from "../reducers/anecdoteReducer"


const baseUrl = 'http://localhost:3001'

export const getAll = async () => {
  return (await axios.get(`${baseUrl}/anecdotes`)).data
}

export const create = async (content) => {
  return (await axios.post(`${baseUrl}/anecdotes`, asObject(content))).data.content
}

export const vote = async (anecdote) => {
  const id = anecdote.id
  const res = await axios.put(`${baseUrl}/anecdotes/${id}`, { ...anecdote, votes: anecdote.votes + 1 })
  console.log("res", res)
}

const anecdoteService = { getAll, create, vote }

export default anecdoteService
