## 1. Install Node.js on Your System

To use typescript we first have to install Node.js, which we can easily do. [Go to the official site](https://nodejs.org/en/download/) and download the related installer (based on the operating system) or use your command line package managers like [Homebrew](https://brew.sh/) or [Chocolatey](https://chocolatey.org/).

## 2. Install dependencies from NPM

After the installation of Node , we can access the npm command to install our project and manage dependencies.

Open your terminal, navigate to the project root and run:

```bash
npm install
```

## 4. Install Sass

To install Sass, we have to run the following npm command:

```bash
npm install sass --save-dev
```

The –save-dev flag means that Sass is a development dependency (as you will see in your package.json, it is under the devDependecies object).

Now we have the Sass functionality with access to the previously mentioned CLI with its commands.

## 5. Run The Script

After the previous steps, all we need is to run our script to generate our CSS file.

```bash
npm run sass
```

## 6. Install TypeScript

Now we need TypeScript yo convert our .TS files in to .JS files. First download TypeScript into your project:

```bash
npm install typescript --save-dev
```

## 3. Start Typescript to watch and transform files.

To let Typescript automatically save files in .JS , we have to run the following npm command:

```bash
npm run type
```

Use your Prefered Live Server software to visualize and edit TS files which will be automaticly saved in JS format.

## 4. Start Live Server to use App and navigate to folder.

```bash
/public/
```
