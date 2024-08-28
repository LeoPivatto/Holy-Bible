import React, { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [passage, setPassage] = useState([]);
  const [error, setError] = useState(null);
  const [chapterIndex, setChapterIndex] = useState(0); // Track the chapter index

  useEffect(() => {
    const fetchedBooks = async () => {
      try {
        const url =
          "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books";
        const response = await fetch(url, {
          headers: { "api-key": process.env.REACT_APP_API_KEY },
        });
        const result = await response.json();
        setBooks(result.data || []);
      } catch (error) {
        setError(error.message || "An error occurred");
      }
    };

    fetchedBooks();
  }, []);

  useEffect(() => {
    if (selectedBook) {
      const fetchedChapters = async () => {
        try {
          const url = `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books/${selectedBook}/chapters`;
          const response = await fetch(url, {
            headers: { "api-key": process.env.REACT_APP_API_KEY },
          });
          const result = await response.json();
          setChapters(result.data || []);
          setChapterIndex(0); // Reset chapter index when a new book is selected
        } catch (error) {
          setError(error.message || "An error occurred");
        }
      };

      fetchedChapters();
    }
  }, [selectedBook]);

  useEffect(() => {
    if (selectedBook && selectedChapter) {
      const fetchPassage = async () => {
        try {
          const url = `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/passages/${selectedChapter}`;
          const response = await fetch(url, {
            headers: { "api-key": process.env.REACT_APP_API_KEY },
          });
          const result = await response.json();
          setPassage(result.data || "");
        } catch (error) {
          setError(error.message || "An error occurred");
        }
      };

      fetchPassage();
    }
  }, [selectedChapter]);

  const handleNextChapter = () => {
    if (chapterIndex < chapters.length - 1) {
      setChapterIndex((prevIndex) => prevIndex + 1);
      setSelectedChapter(chapters[chapterIndex + 1].id); // Set next chapter
    }
  };

  const handlePrevChapter = () => {
    if (chapterIndex > 0) {
      setChapterIndex((prevIndex) => prevIndex - 1);
      setSelectedChapter(chapters[chapterIndex - 1].id); // Set previous chapter
    }
  };

  const listPassages = ({ content }) => {
    if (!content) {
      return <p>loading...</p>;
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  let content;
  content = <>{listPassages(passage)}</>;

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <form>
        <select
          className="text-black"
          name="books"
          id="books"
          onChange={(e) => {
            setSelectedBook(e.target.value);
            setSelectedChapter("");
            setPassage("");
          }}
          value={selectedBook}
        >
          <option className="text-black" value="">
            Select a Book
          </option>
          {books.map((book) => (
            <option className="text-black" key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>

        <select
          className="text-black"
          name="chapters"
          id="chapters"
          onChange={(e) => {
            setSelectedChapter(e.target.value);
            const selectedIndex = chapters.findIndex(
              (chapter) => chapter.id === e.target.value
            );
            setChapterIndex(selectedIndex); // Update chapter index
          }}
          value={selectedChapter}
        >
          <option value="">Select a Chapter</option>
          {chapters.map((chapter) => (
            <option className="text-black" key={chapter.id} value={chapter.id}>
              {chapter.reference}
            </option>
          ))}
        </select>

        <br />
        <br />
      </form>

      {/* Pagination Arrows */}
      <div className="pagination">
        <button onClick={handlePrevChapter} disabled={chapterIndex === 0}>
          ← Previous
        </button>
        <button
          onClick={handleNextChapter}
          disabled={chapterIndex === chapters.length - 1}
        >
          Next →
        </button>
      </div>

      {passage && (
        <div>
          <h2>Passage</h2>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default App;
