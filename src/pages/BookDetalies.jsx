import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios";

function BookDetalies() {
  const [b, setB] = useState({});

  const param = useParams();
  useEffect(() => {
    api.get(`/books/${param.id}`).then((data) => {
      setB(data.data);
    });
  }, [param.id]);

  return (
    <div className="container flex justify-center mt-5 mx-auto">
      <div className="relative flex w-full max-w-4xl border p-5 mb-4 shadow-xl rounded-md bg-white">
        <img
          className="absolute top-4 left-4 w-32 h-44 object-cover rounded-md shadow-lg"
          src={b.thumbnailUrl}
          alt="book img"
        />
        <div className="ml-36 flex flex-col w-full">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{b.title}</h2>
          <p className="mb-2 text-gray-700">
            <h1 className="font-bold">Sahifalar Soni: </h1> {b.pageCount}
          </p>
          <p className="mb-4 text-gray-600">{b.shortDescription} </p>
          <p className="mb-4 text-gray-600">
            <h1 className="font-bold">Haqida:</h1> {b.longDescription}
          </p>
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="font-bold">Yozuvchilar:</h1>
              <ul className="list-disc pl-5 text-gray-600">
                {b.authors &&
                  b.authors.map((author, index) => (
                    <li key={index}>{author}</li>
                  ))}
              </ul>
            </div>
            <div>
              <h1 className="font-bold">Kategoriya</h1>
              <ul className="list-disc pl-5 text-gray-600">
                {b.categories &&
                  b.categories.map((category, index) => (
                    <li key={index}>{category}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetalies;
