function hero(elem) {
	const letterArr = 'Meldebek Alisher'.split('');
	const textArr = [];

	letterArr.map( (letter, i) => {
		if (letter == " ") textArr.push('<br />')
		textArr.push(`<span>${letter}</span>`);
	})
	
	textArr.splice(letterArr.indexOf(" ") + 1, 1);
	const hero = document.querySelector('.hero');
	if (hero) hero.innerHTML = textArr.join(' ');

	const letterList = document.querySelectorAll('.hero span')
	letterList.map((item, i) => {
		setTimeout( () => {
			item.classList.add('hl')
		}, 150 * i)
	})

}

export default hero;