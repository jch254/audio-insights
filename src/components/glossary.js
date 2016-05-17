const glossary = [
  {
    title: 'Mosaic',
    definition: `An album art mosaic of your top fifty tracks based on calculated affinity.
      Affinity is a measure of your expected preference for each particular track.
      It is based on your Spotify behavior, including play history, but does not include actions
      made while in incognito mode. If you're a light or infrequent user of Spotify, you might not
      have sufficient play history to generate a full affinity data set :(`,
  },
  {
    title: 'Recommended',
    definition: `A generated playlist of recommendations based on features of your top tracks. The
      average acousticness, danceability, energy, instrumentalness, speechiness and valence of your
      top fifty tracks are used to generate the playlist. The playlist can be saved to Spotify and
      will be named 'AI Recommended (*_term)' where * is the current term.`,
  },
  {
    title: 'Term',
    definition: `As your Spotify behavior is likely to shift over time, the data displayed in the
      app is available over three terms/time frames. Long term (default) is calculated from several
      years of usage. Medium term is calculated from approximately the last six months of usage.
      Short term is calculated from approximately the last four weeks of usage.`,
  },
  {
    title: 'Acousticness',
    definition: `A confidence measure of whether a track is acoustic. A value of 0% represents low
      confidence the track is acoustic while 100% represents high confidence the track is
      acoustic.`,
  },
  {
    title: 'Danceability',
    definition: `Represents a track's suitability for dancing. Based on a combination of
      musical elements including tempo, rhythm stability, beat strength, and overall regularity.
      A value of 0% is least danceable while 100% is most danceable.`,
  },
  {
    title: 'Energy',
    definition: `A perceptual measure of a track's intensity and activity. Typically,
      energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a
      Bach prelude scores low on the scale. Perceptual features contributing to energy
      include dynamic range, perceived loudness, timbre, onset rate, and general entropy. A value of
      0% is least energetic while 100% is most energetic.`,
  },
  {
    title: 'Instrumentalness',
    definition: `Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as
      instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the
      instrumentalness value is to 100%, the greater likelihood the track contains no vocal content.
      Values above 50% are intended to represent instrumental tracks, but confidence is higher as
      the value approaches 100%.`,
  },
  {
    title: 'Speechiness',
    definition: `Represents the presence of spoken words in a track. The more exclusively
      speech-like the recording (e.g. talk show, audio book, poetry), the closer to 100% the value
      will be. Values above 66% describe tracks that are probably made entirely of spoken words.
      Values between 33% and 66% describe tracks that may contain both music and speech, either in
      sections or layered, including such cases as rap music. Values below 33% most likely represent
      music and other non-speech-like tracks.`,
  },
  {
    title: 'Valence',
    definition: `A measure describing the musical positiveness conveyed by a track. Tracks with high
      valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence
      sound more negative (e.g. sad, depressed, angry).`,
  },
  {
    title: 'Popularity',
    definition: `The popularity of a track is calculated by algorithm and is based, in the most
      part, on the total number of plays the track has had and how recent those plays are. Generally
      speaking, songs that are being played a lot now will have a higher popularity than songs that
      were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an
      album) are rated independently. Popularity may lag actual popularity by a few days: the value
      is not updated in real time.`,
  },
];

export default glossary;
