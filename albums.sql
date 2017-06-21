INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (username, email, password)
VALUES
  ('jhallman5', 'jhallman5@gmail.com', 'test'),
  ('edwin', 'edwin@someEmail.com', 'test')
;

INSERT INTO
  reviews (user_id, album_id, content)
VALUES
  (1, 2, 'I did not get a seat at the table.'),
  (2, 3, 'oh lordy Lorde.')
;
