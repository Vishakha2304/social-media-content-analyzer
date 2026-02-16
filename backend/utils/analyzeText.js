function analyzeText(text) {
  const suggestions = [];

  if (!text || text.trim().length === 0) {
    suggestions.push("No readable content found in the document.");
    return suggestions;
  }

  if (text.length < 120) {
    suggestions.push("Content is quite short. Try adding more details.");
  }

  if (!text.includes("#")) {
    suggestions.push("Adding hashtags can help improve reach.");
  }

  if (!text.includes("!")) {
    suggestions.push("Try adding a call-to-action like 'Check this out!'");
  }

  if (suggestions.length === 0) {
    suggestions.push("Content looks good. No major improvements needed.");
  }

  return suggestions;
}

module.exports = analyzeText;
