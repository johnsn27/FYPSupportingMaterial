// Transverse Slate Block Model

const arr = [];
  const iterate = (obj) => {
    if (obj !== undefined && obj !== null) {
      Object.keys(obj).forEach((key) => {
        if (key === 'text') {
          arr.push(obj[key]);
        }

        if (typeof obj[key] === 'object') {
          iterate(obj[key]);
        }
      });
    }
    return arr;
  };

  const textContent = iterate(asset);
  const textFormatted = [];
  let i = 0;
  textContent.forEach((textItem) => {
    if (i % 2 === 0) {
      textFormatted.push(textItem);
    }
    i += 1;
    return textFormatted;
  });
// ...
// return sidebar
return (
    <div className="editor-container">
        {/* ... */}
        {!isSidebarVisible &&
              <Btn className="sidebar__open-btn" onClick={() => setIsSidebarVisible(true)} aria-label="Open shortcuts sidebar">
                <GELIcon customSvg={keyboardSvg} />
              </Btn>
            }
            {isSidebarVisible &&
              <Sidebar editorFocused={shouldShowContextFor('editor')} toggle={setIsSidebarVisible}>
                <SentimentView text={textFormatted} />
              </Sidebar>
            }
    </div>
)

// ...