export const getParseData = (courses, authors) =>
	courses.reduce((acc, item) => {
		const users = authors.filter((el) =>
			item.authors.some((id) => id === el.id)
		);
		const formattedNames = users.map((el) => el.name);
		return [...acc, { ...item, names: formattedNames }];
	}, []);
