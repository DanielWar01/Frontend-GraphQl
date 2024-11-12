import { gql, useLazyQuery, useQuery } from '@apollo/client'
import './App.css'
import { FourSquare } from 'react-loading-indicators'
import BookCard from './components/BookCard'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import FormBook from './components/FormBook'

export interface Book {
  id: number
  title: string
  author: {
    name: string
    country: string
  }
  pages: number
  year: number
  genre: string
}

export const MAIN_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author {
        name
        country
      }
      pages
      year
      genre
    }
  }
`

export const FIND_BOOK = gql`
  query GetBookById($id: Int!) {
    findById(id: $id) {
      id
      title
      author {
        name
        country
      }
      pages
      year
      genre
    }
  }
`
export const FIND_BOOK_BY_AUTHOR = gql`
  query GetBooksByAuthor($author: String!) {
    findByAuthor(author: $author) {
      id
      title
      author {
        name
        country
      }
      pages
      year
      genre
    }
  }
`

export const FIND_BOOK_BY_GENRE = gql`
  query GetBooksByGenre($genre: String!) {
    findByGenre(genre: $genre) {
      id
      title
      author {
        name
        country
      }
      pages
      year
      genre
    }
  }
`


type MAIN_BOOKS_TYPE = {
  books: Book[]
}

type FormValues = {
  search: string,
  type: string
}

function App() {
  const { data, error, loading } = useQuery<MAIN_BOOKS_TYPE>(MAIN_BOOKS)

  const { register, handleSubmit } = useForm<FormValues>()
  const [getBooksByAuthor] = useLazyQuery(FIND_BOOK_BY_AUTHOR)
  const [getBooksByGenre] = useLazyQuery(FIND_BOOK_BY_GENRE)
  const [getBookById] = useLazyQuery(FIND_BOOK)

  const [bookData, setBookData] = useState<Book[] | null>(null)

  const onSubmit = async (values: FormValues) => {
    if (values.type === 'id') {
      const response = await getBookById({
        variables: { id: parseInt(values.search) }
      })
      setBookData(response.data?.findById ? [response.data.findById] : [])
    } else if (values.type === 'author') {
      const response = await getBooksByAuthor({
        variables: { author: values.search }
      })
      setBookData(response.data?.findByAuthor || [])
    } else if (values.type === 'genre') {
      const response = await getBooksByGenre({
        variables: { genre: values.search }
      })
      setBookData(response.data?.findByGenre || [])
    }
  }

  if (error) return <p>Error: {error?.message}</p>

  return (
    <div className="container max-w-7xl mx-auto">
      <header className="bg-black items-center flex justify-between gap-6 p-5 flex-col sm:flex-row">
        <div className="flex justify-around gap-4 items-center">
          <img className="w-16 h-16 max-h-16" src="/src/assets/libro.png" alt="Logo app" />
          <h1 className="text-4xl font-black text-red-600">Aplicación de libros</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-around gap-4 items-center">
          <input
            {...register('search')}
            className="outline-none p-2 w-72 text-lg border border-neutral-600 rounded-lg"
            type="text"
            name="search"
          />
          <select {...register('type')} className="outline-none p-2 text-lg border border-neutral-600 rounded-lg">
            <option value="id">Buscar por ID</option>
            <option value="author">Buscar por Autor</option>
            <option value="genre">Buscar por Género</option>
          </select>
          <button className="text-white bg-red-500 p-2 rounded-xl font-bold text-lg hover:scale-105 duration-200">
            Buscar
          </button>
        </form>
      </header>
      <FormBook/>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <FourSquare color="#c11121" size="large" text="" textColor="" />
          <p className="text-xl font-bold">Cargando los libros</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 mt-5">
            {(bookData ? bookData : Array.isArray(data?.books) ? data.books : []).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
