$('#search-artist').on('click', function (e) {
  e.preventDefault()
  var nameArtist = $('#artist-name').val()
  var urlSearchArtist = 'https://api.spotify.com/v1/search?type=artist&query=' + nameArtist
  var token = 'BQAIYDFDt6FzsHIFFJiq7HyPFEqbvykJ2iSoVe_Pjp2WaS6LEFSTrIIRZkf_VMflmiE0iybaLc3EV5QAXgxFI4c4LFfmCMxe8ID78_JZdHwFrnwFsc644sXm5XuOkcYfvEFFP2dPrlc'
    // get Artist          
  $.ajax({
    url: urlSearchArtist,
    headers: {
      Authorization: 'Bearer ' + token
    },
    success: function (data) {
      var artistsFound = data.artists.items
      var optionsArtists = '<option disabled selected>Select Artist</option>'
      artistsFound.forEach(function (artistData) {
        optionsArtists += '<option value="' + artistData.id + '">' + artistData.name + '</option>'
      })
      $('#artists-selection').html(optionsArtists)
      $('#artist-container-show').removeClass('hidden')
      $('#album-container-show').addClass('hidden')
      $('#song-container-show').addClass('hidden')
    }
  })
})

// get albums
$('#artists-selection').on('change', function (e) {
  var idArtist = $(this).val()
  var urlAlbums = 'https://api.spotify.com/v1/artists/' + idArtist + '/albums'
  var token = 'BQAIYDFDt6FzsHIFFJiq7HyPFEqbvykJ2iSoVe_Pjp2WaS6LEFSTrIIRZkf_VMflmiE0iybaLc3EV5QAXgxFI4c4LFfmCMxe8ID78_JZdHwFrnwFsc644sXm5XuOkcYfvEFFP2dPrlc'
  $.ajax({
    url: urlAlbums,
    headers: {
        Authorization: 'Bearer ' + token
      },
    success: function (data) {
      var albumFound = data.items
      var optionsAlbum = '<option disabled selected>Select Album</option>'
      albumFound.forEach(function (albumData) {
        optionsAlbum += '<option data-image-album="' + albumData.images[1].url + '" value="' + albumData.id + '">' + albumData.name + '</option>'
      })
      $('#album-selection').html(optionsAlbum)
      $('#album-container-show').removeClass('hidden')
      $('#song-container-show').addClass('hidden')
    }
  })
})

// get songs
$('#album-selection').on('change', function (e) {
  var idAlbum = $(this).val()
  var urlAlbum = 'https://api.spotify.com/v1/albums/' + idAlbum + '/tracks'
  var token = 'BQAIYDFDt6FzsHIFFJiq7HyPFEqbvykJ2iSoVe_Pjp2WaS6LEFSTrIIRZkf_VMflmiE0iybaLc3EV5QAXgxFI4c4LFfmCMxe8ID78_JZdHwFrnwFsc644sXm5XuOkcYfvEFFP2dPrlc'
  var coverAlbum = $(this).find('option:selected').data('image-album')
  $.ajax({
    url: urlAlbum,
    headers: {
        Authorization: 'Bearer ' + token
      },
    success: function (data) {
      console.log(data)
      var songsList = data.items
      var showTrackList = ''
      songsList.forEach(function (songsData) {
        showTrackList += '<li class="list-group-item list-tracks"><a href="' + songsData.external_urls.spotify + '">' + songsData.name + '</a></li>'

      })
        
         
      
      $('#album-image').attr('src', coverAlbum)
      $('#song-selection').html(showTrackList)
      $('#song-container-show').removeClass('hidden')
    }
  })
})