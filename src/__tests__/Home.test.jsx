import { render } from '@testing-library/react'
import Home from '../pages/Home';

//Test Case for Home page
test("Home Page should be render indepenatly", () => {
    render(<Home/>);
})


