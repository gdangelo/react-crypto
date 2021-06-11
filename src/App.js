import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  Home,
  Coins,
  NotFound,
  Watchlist,
  About,
  Terms,
  PrivacyPolicy,
} from 'pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/coins/:id" component={Coins} />
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/about" component={About} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        {/* No match - 404 */}
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
