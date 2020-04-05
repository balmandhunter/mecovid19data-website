module.exports = {
  siteMetadata: {
    title: `Maine COVID-19 Data`,
    description: `Compilation of data from Maine CDC, US CDC, NYTimes, and Portland Press Herald about COVID-19 in Maine.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
