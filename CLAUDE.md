# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Serve Site**: `jekyll server` or `rake preview`
- **Serve with Drafts**: `jekyll server -D`
- **Create New Post**: `rake post title="Your Post Title"`
- **Create New Page**: `rake page name="your-page.md"`
- **Lint Code**: `npx prettier --write .`

## Project Architecture

This repository is a static blog built with **Jekyll** and the **Jekyll Bootstrap** framework.

### Directory Structure
- `_posts/`: Contains blog posts in Markdown format (`YYYY-MM-DD-title.md`).
- `_layouts/`: Site-wide templates (e.g., `post`, `page`, `default`).
- `_includes/`: Reusable Liquid partials. Includes a `JB/` subdirectory for Jekyll Bootstrap core components.
- `_plugins/`: Custom Jekyll plugins (Ruby scripts).
- `_data/`: YAML/JSON data files used in templates.
- `assets/`: Static assets including CSS, JavaScript, and theme-specific files.
- `img/`: Image assets used in posts and across the site.
- `_config.yml`: Main configuration file for Jekyll settings, site metadata, and permalinks.
- `Rakefile`: Contains tasks for automating post/page creation and theme management.

### Key Metadata
- **Permalinks**: Structured as `/:categories/:year/:month/:day/:title/`.
- **Markdown Engine**: Kramdown.
- **Theme System**: Uses Jekyll Bootstrap's theme switching mechanism (see `rake theme` tasks in `Rakefile`).
