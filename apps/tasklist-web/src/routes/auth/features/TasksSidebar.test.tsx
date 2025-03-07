import { beforeEach, describe, expect, it, vi } from 'vitest';
import auth from '@repo/translation/en/auth.json';
import common from '@repo/translation/en/common.json';
import { render, fireEvent } from '@/utils/testUtils';
import { logout } from '@/utils/logout';
import { mockEmail } from '@/__fixtures__/auth';
import { TasksSidebar } from './TasksSidebar';

let mockIsSidebarOpen = true;
const mockSetIsSidebarOpen = vi.fn();
let mockAuth = { email: mockEmail };
const mockLogout = vi.fn();

vi.mock('@/hooks/useAppStore', () => ({
  useAppStore: () => ({
    isSidebarOpen: mockIsSidebarOpen,
    setIsSidebarOpen: mockSetIsSidebarOpen,
  }),
}));

vi.mock('@/hooks/useAuthStore', () => ({
  useAuthStore: () => ({
    auth: mockAuth,
  }),
}));

vi.mock('@/utils/logout', () => ({
  logout: vi.fn(),
}));

const setup = () => render(<TasksSidebar />);

describe('TasksSidebar', () => {
  beforeEach(() => {
    mockIsSidebarOpen = true;
    mockAuth = { email: mockEmail };
    mockSetIsSidebarOpen.mockClear();
    mockLogout.mockClear();
  });

  it('Should not render when isSidebarOpen is false', () => {
    mockIsSidebarOpen = false;
    const { container } = setup();

    expect(container.firstChild).toBeNull();
  });

  it('Should render sidebar with user email and sign out button when isSidebarOpen is true', () => {
    const screen = setup();

    expect(screen.getByText(auth.signedInAs)).toBeInTheDocument();
    expect(screen.getByText(mockEmail)).toBeInTheDocument();
    expect(screen.getByText(auth.signOut)).toBeInTheDocument();
  });

  it('Should close sidebar on overlay click', () => {
    const screen = setup();

    const overlay = screen.getByTestId('sidebar-overlay');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);

    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
  });

  it('Should close sidebar on back button click', () => {
    const screen = setup();

    const closeButton = screen.getByRole('button', { name: common.close });
    fireEvent.click(closeButton);

    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
  });

  it('Should call logout on sign out button click', () => {
    const screen = setup();

    const logoutSpy = vi.mocked(logout);

    const signOutButton = screen.getByText(auth.signOut);
    fireEvent.click(signOutButton);

    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
    expect(logoutSpy).toHaveBeenCalled();
  });
});
