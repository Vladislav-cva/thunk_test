import React from 'react';

import Button from '../../../common/Button/Button.jsx';

export function AllAuthors({
	authorsData,
	handleChooseAuthors,
	id,
	likedAuthors,
	handleRemoveChooseAuthors,
}) {
	return (
		<div className='choose-authors'>
			<h3>Authors</h3>
			{authorsData.map((item) => {
				return (
					<div
						name={item.id}
						key={item.id}
						className='authors-block'
						data-testid='authors-block'
					>
						<span>{item.name}</span>
						<Button
							dataTestid='addAuthorInList'
							title='Add author'
							onClick={() => handleChooseAuthors(item.id, item.name)}
							type='button'
						/>
					</div>
				);
			})}
			<h3>Course authors</h3>
			<div>
				<div>
					{!id ? (
						<>
							{likedAuthors.length ? (
								<>
									{likedAuthors.map((item) => {
										return (
											<div
												className='authors-block'
												key={item.id}
												data-testid='chooseAuthorsBlock'
											>
												<span>{item.name}</span>
												<Button
													dataTestid='deleteAuthorInList'
													title='Delete author'
													onClick={() =>
														handleRemoveChooseAuthors(item.id, item.name)
													}
												/>
											</div>
										);
									})}
								</>
							) : (
								<span>authors list is empty</span>
							)}
						</>
					) : (
						<div>
							{likedAuthors.map((item, index) => {
								return (
									<div className='authors-block' key={index}>
										<span>{item.name}</span>
										<Button
											title='Delete author'
											onClick={() =>
												handleRemoveChooseAuthors(item.id, item.name)
											}
										/>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
