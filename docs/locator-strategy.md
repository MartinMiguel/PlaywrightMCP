Locator strategy priority:
1) getByTestId
2) getByRole + accessible name
3) getByLabel
4) text (careful)
5) CSS/XPath only as last resort
Never use nth-child selectors unless unavoidable.