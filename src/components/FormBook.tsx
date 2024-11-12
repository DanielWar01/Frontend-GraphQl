import { gql } from "@apollo/client";
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

// Definir la mutación GraphQL
export const ADD_BOOK = gql`
    mutation AddNewBook($title: String!, $author: AuthorInput!, $pages: Int!, $year: Int!, $genre: String!) {
        addBook(book: { title: $title, author: $author, pages: $pages, year: $year, genre: $genre }) {
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
`;

// Definir los tipos para los valores del formulario
interface FormValues {
    title: string;
    author: string;
    country: string;
    pages: number;
    year: number;
    genre: string;
}

export default function FormBook() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const [addBook] = useMutation(ADD_BOOK);

    const onSubmit = async (values: FormValues) => {
        const pages = parseInt(values.pages.toString(), 10); 
        const year = parseInt(values.year.toString(), 10);   
        const { data } = await addBook({
            variables: {
                title: values.title,
                author: {
                    name: values.author,
                    country: values.country,
                },
                pages,
                year,
                genre: values.genre
            },
        })
        console.log(data)
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Agregar un nuevo libro</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
            <input
                id="title"
                {...register('title', { required: 'Este campo es obligatorio' })}
                placeholder="Título del libro"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
            </div>

            <div className="form-group">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">Nombre del autor:</label>
            <input
                id="author"
                {...register('author', { required: 'Este campo es obligatorio' })}
                placeholder="Nombre del autor"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.author && <p className="text-red-600 text-sm">{errors.author.message}</p>}
            </div>

            <div className="form-group">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">País del autor:</label>
            <input
                id="country"
                {...register('country', { required: 'Este campo es obligatorio' })}
                placeholder="País del autor"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
            </div>

            <div className="form-group">
            <label htmlFor="pages" className="block text-sm font-medium text-gray-700">Número de páginas:</label>
            <input
                id="pages"
                type="number"
                {...register('pages', { required: 'Este campo es obligatorio' })}
                placeholder="Número de páginas"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.pages && <p className="text-red-600 text-sm">{errors.pages.message}</p>}
            </div>

            <div className="form-group">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Año de publicación:</label>
            <input
                id="year"
                type="number"
                {...register('year', { required: 'Este campo es obligatorio' })}
                placeholder="Año de publicación"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.year && <p className="text-red-600 text-sm">{errors.year.message}</p>}
            </div>

            <div className="form-group">
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Género:</label>
            <input
                id="genre"
                {...register('genre', { required: 'Este campo es obligatorio' })}
                placeholder="Género"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.genre && <p className="text-red-600 text-sm">{errors.genre.message}</p>}
            </div>

            <button type="submit" className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300">
            Agregar Libro
            </button>
        </form>
        </div>
    );
}
