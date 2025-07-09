import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationModal from "./ConfirmationModal";
import { vi } from "vitest";

describe("ConfirmationModal Component", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  it("should not render when isOpen is false", () => {
    render(
      <ConfirmationModal
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        message="Test Message"
      />
    );
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("should render correctly when isOpen is true", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Delete Item"
        message="Are you sure?"
      />
    );

    // Check if the modal is in the document
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    // Check if the title and message are displayed
    expect(screen.getByText("Delete Item")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();

    // Check if buttons are present
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it("should call onConfirm when the confirm button is clicked", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test"
        message="Test"
      />
    );

    const confirmButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when the cancel button is clicked", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test"
        message="Test"
      />
    );

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
