# bkndmvrgnzr frontend

## Overview

> Please keep in mind that this is an **early work in progress**.

This repository includes the frontend of my simple and open source book and movie organizer project bkndmvrgnzr (inofficially also BAMO), which I started building during my work placement at [CEWE](https://www.cewe.de/). It has the following features:

- [ ] Keep track of all your books and movie with advanced sorting options.
- [ ] Import information from reputable online providers.
- [ ] Group movies and book by genres, artists, year of publication and more.
- [ ] Allow different users to selectively interact with the database via permissions.

## Dependencies

I generally try to minimize dependencies, but I'm a one man crew and can therefore only support Debian-based Linux
distributions as I'm running one myself. Anyway, you need to have the following packages installed for everything to
work properly:

- NodeJS as the development base. Install it via the [installation guide](https://github.com/nodesource/distributions#debinstall).

## How to use it

First install the needed packages via `npm install`. Then build the program via `npm run build` and run it via `npm run preview`.

## Sitemap

### Auth

- [x] Login / signup: /
- [x] Welcome: /welcome ROLE_USER

### Book

- [ ] Book search: /book ROLE_USER
- [ ] Book library: /book/library ROLE_USER
- [ ] Add a book: /book/add ROLE_EDITOR
- [ ] View a book: /book/[isbn] ROLE_USER
- [ ] Edit a book: /book/edit/[isbn] ROLE_EDITOR

### Book role

- [ ] Book role search: /book-role ROLE_USER
- [ ] Add a book role: /book-role/add ROLE_EDITOR
- [ ] View a book role: /book-role/[bookRoleId] ROLE_USER
- [ ] Edit a book role: /book-role/edit/[bookRoleId] ROLE_EDITOR

### Contributor

- [ ] Contributor search: /contributor ROLE_USER
- [ ] Add a contributor: /contributor/add ROLE_EDITOR
- [ ] View a contributor: /contributor/[contributorId] ROLE_USER
- [ ] Edit a contributor: /contributor/edit/[contributorId] ROLE_EDITOR

### Genre

- [ ] Genre search: /genre ROLE_USER
- [ ] Add a genre: /genre/add ROLE_EDITOR
- [ ] View a genre: /genre/[genreId] ROLE_USER
- [ ] Edit a genre: /genre/edit/[genreId] ROLE_EDITOR

### Movie

- [ ] Movie search: /movie ROLE_USER
- [ ] Movie library: /movie/library ROLE_USER
- [ ] Add a movie: /movie/add ROLE_EDITOR
- [ ] View a movie: /movie/[isan] ROLE_USER
- [ ] Edit a movie: /movie/edit/[isan] ROLE_EDITOR

### Movie role

- [ ] Movie role search: /movie-role ROLE_USER
- [ ] Add a movie role: /movie-role/add ROLE_EDITOR
- [ ] View a movie role: /movie-role/[movieRoleId] ROLE_USER
- [ ] Edit a movie role: /movie-role/edit/[movieRoleId] ROLE_EDITOR

### Publishing house

- [ ] Publishing house search: /publishing-house ROLE_USER
- [ ] Add a publishing house: /publishing-house/add ROLE_EDITOR
- [ ] View a publishing house: /publishing-house/[publishingHouseId] ROLE_USER
- [ ] Edit a publishing house: /publishing-house/edit/[publishingHouseId] ROLE_EDITOR

### User

- [ ] View user: /user ROLE_USER
- [ ] Edit user: /user/edit ROLE_USER
- [ ] User search: /user/search ROLE_ADMIN
- [ ] View a specific user: /user/[userId] ROLE_ADMIN
- [ ] Edit a specific user: /user/edit/[userId] ROLE_ADMIN