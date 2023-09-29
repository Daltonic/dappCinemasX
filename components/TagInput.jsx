import React, { useState } from 'react'

const TagInput = () => {
  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleTagAddition = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    setTags([...tags, inputValue.trim()])
    setInputValue('')
  }

  const handleTagRemoval = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleTagAddition} className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter a tag"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </form>
      <div>
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
          >
            {tag}
            <button
              onClick={() => handleTagRemoval(tag)}
              className="ml-1 text-red-600 text-xs font-medium hover:text-red-800"
            >
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

export default TagInput
