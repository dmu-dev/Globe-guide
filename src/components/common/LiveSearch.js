import React, { useEffect, useRef, useState, useCallback } from "react";

function LiveSearch(props) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const resultContainer = useRef();

  const handleSelection = (selectedIndex) => {
    const selectedItem = props.results[selectedIndex];
    setDefaultValue(selectedItem.name.common);
    if (!selectedItem) return resetSearchComplete();
    props.onSelect && props.onSelect(selectedItem);
    resetSearchComplete();
  };

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    props.onChange && props.onChange(e);
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  const handleKeyDown = (e) => {
    console.log("contol here")
    const { key } = e;
    let nextIndexCount = 0;

    if (key === "ArrowDown") {
      nextIndexCount = (focusedIndex + 1) % props.results.length;
    }
    if (key === "ArrowUp") {
      nextIndexCount = (focusedIndex + props.searchItems.length - 1) % props.results.length;
    }
    if (key === "Escape") {
      resetSearchComplete();
    }

    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }
    setFocusedIndex(nextIndexCount)
  }

  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.scrollIntoView({
      block: "center"
    })
  }, [focusedIndex])

  useEffect(() => {
    if (props.results.length > 0 && !showResults) setShowResults(true);
    if (props.results.length <= 0) setShowResults(false);
  }, [props.results]);

  return (
    <div id="livesearch" data-testid="searchbar">
      <div data-testid="input-wrapper" onBlur={resetSearchComplete} onKeyDown={handleKeyDown} className="relative">
        <input data-testid="input" value={defaultValue} type="text" placeholder="Search by Country" onChange={handleChange} />

        {showResults && <div data-testid="dropdown" className="absolute dropdown">

          {props.results.map((item, index) => {
            return (
              <div data-testid={index} key={index} onMouseDown={() => handleSelection(index)} ref={index === focusedIndex ? resultContainer : null} style={{
                backgroundColor:
                  index === focusedIndex ? "rgba(0,0,0,0.1)" : "",
              }}>
                {item?.name?.common}
              </div>
            )
          })}
        </div>
        }
      </div>
    </div>
  )
}

export default LiveSearch;