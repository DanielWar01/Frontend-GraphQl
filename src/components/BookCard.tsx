import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Book } from '../App';

export const DELETE_BOOK = gql`
    mutation DeleteBook($id: Int!) {
        deleteBook(id: $id) {
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


const BookCard = ({ book }: { book: Book }) => {
    const [deleteBook] = useMutation(DELETE_BOOK);

    const handleDelete = async () => {
        const { data } = await deleteBook({
            variables: {
                id: book.id
            }
        })
        console.log(data)
    };

    return (
        <div className="max-w-sm rounded-md cursor-pointer hover:scale-105 duration-100 overflow-hidden shadow-lg bg-white border border-gray-200 p-4 m-4">
            <div className="px-6 py-4 flex flex-col gap-2">
                <h2 className="font-bold text-3xl text-blue-600">{book.title}</h2>
                <p className="text-gray-600 text-sm"><span className="font-bold text-lg">Creado por: </span> {book.author.name} <span className="font-bold">({book.author.country})</span></p>
                <p className="text-gray-600 text-sm">{book.pages} páginas</p>
                <p className="text-gray-600 text-sm"><span className="font-bold text-lg">Publicado en: </span> {book.year}</p>
                <p className="text-gray-600 text-sm"><span className="font-bold text-lg">Género: </span> <span className="bg-red-500 text-white font-semibold text-lg p-1 rounded">{book.genre}</span></p>
                <div className="flex justify-between">
                    <button className="p-2 font-bold text-lg bg-blue-500 text-white rounded hover:scale-105 duration-300 shadow-xl">Editar</button>
                    <button onClick={handleDelete} className="p-2 font-bold text-lg bg-orange-500 text-white rounded hover:scale-105 duration-300 shadow-xl">Eliminar</button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
