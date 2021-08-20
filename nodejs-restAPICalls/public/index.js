document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('ops').addEventListener('click', (e) => {
		e.stopPropagation();
		if (!e.target.parentElement.classList.contains('is-active')) {
			document.querySelector('li.is-active').classList.remove('is-active');
			e.target.parentElement.classList.add('is-active')
			document.getElementById('create').classList.add('is-hidden');
			document.getElementById('retrieve').classList.add('is-hidden');
			document.getElementById('update').classList.add('is-hidden');
			document.getElementById('deletion').classList.add('is-hidden')
			switch (e.target.textContent) {
				case 'Create':
					document.getElementById('create').classList.remove('is-hidden');
					break
				case 'Retrieve':
					document.getElementById('retrieve').classList.remove('is-hidden');
					break
				case 'Update':
					document.getElementById('update').classList.remove('is-hidden');
					break
				case 'Delete':
					document.getElementById('deletion').classList.remove('is-hidden');
					break
			}
		}
	});

	document.getElementById('createBtn').addEventListener('click', async (e) => {
		let flag = false;
		const id = document.getElementById('createID').value;
		if (id === '') {
			document.getElementById('createID').classList.add('is-danger');
			setTimeout(() => document.getElementById('createID').classList.remove('is-danger'), 3000);
			flag = true;
		}
		const name = document.getElementById('createName').value;
		if (name === '') {
			document.getElementById('createName').classList.add('is-danger');
			setTimeout(() => document.getElementById('createName').classList.remove('is-danger'), 3000);
			flag = true
		}
		const grade = document.getElementById('createGrade').value;
		if (grade === '') {
			document.getElementById('createGrade').classList.add('is-danger');
			setTimeout(() => document.getElementById('createGrade').classList.remove('is-danger'), 3000);
			flag = true
		}
		if (flag) {
			alert('Please enter all details!');
		}
		else {
			const dept = {
				"id": id,
				"name": name,
				"grade": grade
			}
			try {
				const response = await fetch('http://localhost:3000/db', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dept)
				});
				document.getElementById('submitSuccess').classList.remove('is-hidden');
				setTimeout(() => document.getElementById('submitSuccess').classList.add('is-hidden'), 3000);
			}
			catch (err) {
				console.error(err);
			}
		}
	});

	document.getElementById('retrieveBtn').addEventListener('click', async (e) => {
		const id = document.getElementById('retrieveID').value;
		if (id === '') {
			alert('Please enter all details!');
		}
		else {
			try {
				const response = await fetch('http://localhost:3000/db');
				const data = await response.json();
				const dept = data.db;
				const item = dept.find((ele) => {
					return ele.id === id;
				})
				document.getElementById('results').classList.remove('is-hidden');
				const tableParent = document.getElementById('res_table');
				while (tableParent.hasChildNodes()) {
					tableParent.removeChild(tableParent.firstChild);
				}
				populate(tableParent, item);
			}
			catch (err) {
				console.error(err);
			}
		}
	});

	document.getElementById('retrieveAll').addEventListener('click', async (e) => {
		try {
			const response = await fetch('http://localhost:3000/db');
			const data = await response.json();
			const dept = data.db;
			document.getElementById('results').classList.remove('is-hidden');
			const tableParent = document.getElementById('res_table');
			while (tableParent.hasChildNodes()) {
				tableParent.removeChild(tableParent.firstChild);
			}
			dept.forEach(item => populate(tableParent, item));
		}
		catch (err) {
			console.error(err);
		}
	});

	document.getElementById('updateBtn').addEventListener('click', async (e) => {
		const id = document.getElementById('updateID').value;
		const name = document.getElementById('updateName').value;
		const grade = document.getElementById('updateHOD').value;
		if (id === '' || name === '' || grade === '') {
			alert('Please enter all details!');
		}
		else {
			const dept = {
				"id": id,
				"name": name,
				"grade": grade
			}
			try {
				const response = await fetch(`http://localhost:3000/db/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(dept)
				});
				if (response.status === 404) {
					alert('The requested ID was not found!')
				}
			}
			catch (err) {
				console.error(err);
			}
		}
	});

	document.getElementById('deleteBtn').addEventListener('click', async (e) => {
		const id = document.getElementById('deleteID').value;
		if (id === '') {
			alert('Please enter all details!');
		}
		try {
			const response = await fetch(`http://localhost:3000/db/${id}`, {
				method: 'DELETE'
			});
		}
		catch (err) {
			console.error(err);
		}
	});

});

function populate(tableParent, item) {
	const parent = document.createElement('tr');
	tableParent.appendChild(parent);
	const text1 = document.createElement('th');
	text1.innerHTML = `${item.id}`;
	parent.appendChild(text1);
	const text2 = document.createElement('td');
	text2.innerHTML = `${item.name}`;
	parent.appendChild(text2);
	const text3 = document.createElement('td');
	text3.innerHTML = `${item.grade}`;
	parent.appendChild(text3);
}
