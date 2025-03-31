# Criador de Currículos (Curriculumn creator)

This project is a curriculum builder that requires no login. if follows a common brazilian design trend to create brazilian curriculums (more specifically [this model](https://www.estagiotrainee.com/modelo-cv-b))

Everything is based on conditional rendering to show different information depending on whether the browser is in print mode:

```
IF NOT printMode
	render an <input> and store its data in state
ELSE
	render a <li> with the input's data
```

page layout-wise, it's desktop-first designed, with a single media query for both smartphones and tablets achieved by a scaling of all elements' font size based on the viewport width and a print query with all the necessary changes to turn the page into a printable brazilian curriculum.
