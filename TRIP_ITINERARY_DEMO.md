# Trip-Itinerary Association Demo

This demonstrates the key functionality of the trip-itinerary association feature.

## Key Features

### 1. Trip Management
- Create new trips with name, destination, description, and dates
- View all trips in a grid layout
- Each trip shows the number of associated itineraries

### 2. Itinerary Association
- Navigate to a trip detail page to see all associated itineraries
- Add new itineraries directly to a specific trip
- Each itinerary is automatically linked to its parent trip via `tripId`

### 3. CRUD Operations
- **Create**: Add new trips and itineraries
- **Read**: View trips and their associated itineraries
- **Update**: Edit existing itineraries (updates automatically reflect in parent trip)
- **Delete**: Remove itineraries (automatically updates trip view)

### 4. Data Relationships
- Each `Trip` contains an array of `Itinerary` objects
- Each `Itinerary` has a `tripId` that references its parent trip
- Changes to itineraries automatically update the parent trip's `updatedAt` timestamp

## Usage Flow

1. **Start**: Visit the home page and click "Trips" in navigation
2. **Create Trip**: Click "Add New Trip" and fill in trip details
3. **View Trip**: Click "View Details" on any trip card
4. **Add Itinerary**: In trip detail view, click "Add Itinerary"
5. **Manage Itineraries**: Edit or delete itineraries as needed
6. **Real-time Updates**: Notice how trip view updates automatically

## Technical Implementation

- **State Management**: React Context with proper TypeScript typing
- **Routing**: Full client-side routing with @tanstack/react-router
- **UI Components**: Responsive design consistent with existing app style
- **Data Persistence**: In-memory state (easily extensible to backend storage)

## Testing

Run `npm test` to execute the test suite that verifies:
- Trip creation and retrieval
- Itinerary association with trips
- CRUD operations maintain data integrity
- Proper parent-child relationships