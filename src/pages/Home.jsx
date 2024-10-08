import React, { useEffect, useState } from "react";
import api from "../../axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [find, setFind] = useState("");
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    const fetchBooks = () => {
      api
        .get("/books")
        .then(({ data }) => {
          setBooks(data);
        })
        .catch((error) => {
          console.error("Failed to fetch books:", error);
        })
        .finally(() => {
          setLoader(false);
        });
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesMinPages = !minimum || book.pageCount >= Number(minimum);
    const matchesMaxPages = !maximum || book.pageCount <= Number(maximum);
    const matchesSearch = book.title.toLowerCase().includes(find.toLowerCase());
    return matchesMinPages && matchesMaxPages && matchesSearch;
  });

  const handleClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Izlash..."
          value={find}
          onChange={(event) => setFind(event.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="100"
          value={minimum}
          onChange={(event) => setMinimum(event.target.value)}
          className="border p-2 rounded ml-2"
        />
        <input
          type="number"
          placeholder="5000"
          value={maximum}
          onChange={(event) => setMaximum(event.target.value)}
          className="border p-2 rounded ml-2"
        />
      </div>

      <div className="flex flex-wrap gap-10 justify-center">
        {loader && <img className="w-10 h-10" src="gifloaded.gif" alt="" />}

        {filteredBooks.map((book) => (
          <div
            key={book.id}
            onClick={() => handleClick(book.id)}
            className="border cursor-pointer w-72 h-100% p-5 mb-4 shadow-xl rounded-md border-solid border-sky-200"
          >
            <div className="border-solid hover:border-dotted">
              <img
                className="mx-auto w-full h-1/2 mb-5"
                src={book.thumbnailUrl}
              />
              <h2 className="text-xl font-bold mb-2">{book.title}</h2>
              <p className="mb-2">
                <h1 className="font-bold">Sahifalar</h1> {book.pageCount}
              </p>
              <div className="flex gap-5">
                <div className="mb-4">
                  <h1 className="font-bold">Yozuvchilar</h1>
                  <ul>
                    {book.authors?.map((author, index) => (
                      <li key={index}>{author}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <h1
                    className="font-bold
                  "
                  >
                    Kategoriya
                  </h1>
                  <ul>
                    {book.categories?.map((category, index) => (
                      <li key={index}>{category}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
