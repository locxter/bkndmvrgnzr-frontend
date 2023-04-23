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

- [x] Book search: /book ROLE_USER
- [x] Book library: /book/library ROLE_USER
- [x] Create a book: /book/create ROLE_EDITOR
- [x] Get a book: /book/[isbn] ROLE_USER
- [x] Update a book: /book/update/[isbn] ROLE_EDITOR

### Book role

- [x] Book role search: /book-role ROLE_USER
- [x] Create a book role: /book-role/create ROLE_EDITOR
- [x] Get a book role: /book-role/[bookRoleId] ROLE_USER
- [x] Update a book role: /book-role/update/[bookRoleId] ROLE_EDITOR

### Contributor

- [x] Contributor search: /contributor ROLE_USER
- [x] Create a contributor: /contributor/create ROLE_EDITOR
- [x] Get a contributor: /contributor/[contributorId] ROLE_USER
- [x] Update a contributor: /contributor/update/[contributorId] ROLE_EDITOR

### Genre

- [x] Genre search: /genre ROLE_USER
- [x] Create a genre: /genre/create ROLE_EDITOR
- [x] Get a genre: /genre/[genreId] ROLE_USER
- [x] Update a genre: /genre/update/[genreId] ROLE_EDITOR

### Movie

- [x] Movie search: /movie ROLE_USER
- [x] Movie library: /movie/library ROLE_USER
- [x] Create a movie: /movie/create ROLE_EDITOR
- [x] Get a movie: /movie/[isan] ROLE_USER
- [x] Update a movie: /movie/update/[isan] ROLE_EDITOR

### Movie role

- [x] Movie role search: /movie-role ROLE_USER
- [x] Create a movie role: /movie-role/create ROLE_EDITOR
- [x] Get a movie role: /movie-role/[movieRoleId] ROLE_USER
- [x] Update a movie role: /movie-role/update/[movieRoleId] ROLE_EDITOR

### Publishing house

- [x] Publishing house search: /publishing-house ROLE_USER
- [x] Create a publishing house: /publishing-house/create ROLE_EDITOR
- [x] Get a publishing house: /publishing-house/[publishingHouseId] ROLE_USER
- [x] Update a publishing house: /publishing-house/update/[publishingHouseId] ROLE_EDITOR

### User

- [ ] Get user: /user ROLE_USER
- [ ] Update user: /user/update ROLE_USER
- [ ] User search: /user/search ROLE_ADMIN
- [ ] Get a specific user: /user/[userId] ROLE_ADMIN
- [ ] Update a specific user: /user/update/[userId] ROLE_ADMIN