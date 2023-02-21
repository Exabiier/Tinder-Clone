
import StackNavigation from '../Navigation/StackNavigation';

describe('StackNavigation', () => {
  it('navigates to the Chat screen when the Chat button is pressed', () => {
    const {getByTestId, getByText} = render(<StackNavigation />);
    const homeScreen = getByTestId('HomeScreen');
    const chatButton = getByText('Chat');

    // Expect the Home screen to be rendered initially
    expect(homeScreen).toBeDefined();
    expect(chatButton).toBeDefined();

    // Simulate a press on the Chat button
    fireEvent.press(chatButton);

    // Expect the Chat screen to be rendered after the press
    const chatScreen = getByTestId('ChatScreen');
    expect(chatScreen).toBeDefined();
  });
});