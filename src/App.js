import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useScrollToTop } from 'hooks';
import {
  Home,
  Coins,
  NotFound,
  Watchlist,
  About,
  Terms,
  PrivacyPolicy,
} from 'pages';

function ScrollToTop({ children = null }) {
  useScrollToTop();
  return children;
}

function App() {
  return (
    <Router>
      <ScrollToTop>
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
      </ScrollToTop>
    </Router>
  );
}

export default App;
