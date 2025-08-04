# Trakt.tv Analytics Service

## Overview

The TraktService is designed specifically for user analytics and activity tracking, not content discovery. TMDB handles all content discovery features (trending, popular, top-rated, etc.). This service integrates with Trakt.tv API to track user interactions with media content.

## Key Features

### 🎬 Scrobble Methods - Real-time tracking

- `scrobbleStart()` - Start watching a movie/episode
- `scrobblePause()` - Pause viewing
- `scrobbleStop()` - Stop/finish viewing
- Tracks viewing progress in real-time

### 📱 Check-in Methods - Social sharing

- `checkinMovie()` - Share movie watching activity
- `checkinEpisode()` - Share episode watching activity
- `deleteCheckin()` - Remove active check-in
- Enables social media sharing and location-based check-ins

### 📊 History Methods - Watch tracking

- `addToHistory()` - Mark content as watched
- `removeFromHistory()` - Remove from watch history
- `getHistory()` - Retrieve user's viewing history
- Tracks what users have watched and when

### 💾 Collection Methods - Owned content

- `addToCollection()` - Add to personal collection
- `removeFromCollection()` - Remove from collection
- `getCollection()` - Get user's collection
- Manages user's owned/collected media

### 🔖 Watchlist Methods - Want to watch

- `addToWatchlist()` - Add to watchlist
- `removeFromWatchlist()` - Remove from watchlist
- `getWatchlist()` - Get user's watchlist
- Manages content users plan to watch

### 📝 Custom Lists Methods

- `createList()` - Create custom lists
- `getUserLists()` - Get all user lists
- `getListItems()` - Get items in a list
- `addToList()` / `removeFromList()` - Manage list content
- `deleteList()` - Remove lists
- Enables custom content organization

### ⭐ Favorites Methods - Liked content

- `addToFavorites()` - Mark as favorite (10/10 rating)
- `removeFromFavorites()` - Remove favorite status
- `getFavorites()` - Get user's favorites
- Manages user's favorite content

### 📈 Analytics Methods

- `getUserStats()` - Get detailed user statistics
- `getUserWatching()` - Get currently watching content
- Provides insights into user behavior

### 🔍 Search Method

- `search()` - Find content for adding to lists/collections
- Limited search functionality for analytics purposes

## Authentication

All methods require user access tokens from Trakt.tv OAuth flow for accessing user-specific data.

## Configuration

Requires these environment variables:

- `TRAKT_CLIENT_ID` - Trakt.tv API client ID
- `TRAKT_CLIENT_SECRET` - Trakt.tv API client secret
- `TRAKT_API_URL` - Trakt.tv API base URL

## Usage Pattern

This service should be used by analytics and user activity modules to:

1. Track what users are watching in real-time
2. Manage user's personal content organization
3. Generate viewing statistics and insights
4. Enable social sharing of viewing activities

## Integration Points

- User authentication system (for access tokens)
- Media player (for scrobbling)
- User profile/dashboard (for collections, watchlists)
- Analytics dashboard (for statistics)
