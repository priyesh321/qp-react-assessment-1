import React from "react";
import {render,fireEvent,screen} from '@testing-library/react';
import TodoList from './components/TodoList';

test('Adding a Todo item', () => {
    render(<TodoList />);

    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const addButton = screen.getByText('Add Todo');

    fireEvent.change(titleInput,{target:{value:'Test Todo'}});
    fireEvent.change(descriptionInput,{target:{value:'Test Description'}});
    fireEvent.click(addButton);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
});

test('Toggling Todo Completion', () => {
    render(<TodoList />);

    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const addButton = screen.getByText('Add Todo');

    fireEvent.change(titleInput,{target:{value:'Test Todo'}});
    fireEvent.change(descriptionInput,{target:{value:'Test Description'}});
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
})