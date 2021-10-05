import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react';
import renderer from 'react-test-renderer';
import './ButtonsGroup'
import ButtonGroups from "./ButtonsGroup";

let selectHandler = jest.fn();

describe('Buttons group', () => {

  const getComponent = (props = {}) => <ButtonGroups
    title={"Testing component"}
    description={'This is the description'}
    buttons={['First option', 'Second option']}
    selectHandler={selectHandler}
    {...props}
  />;

  const clickOnLink = (link, calledWith) => {
    // Click on the first element.
    fireEvent.click(link);
    expect(selectHandler).toBeCalledWith(calledWith);
  }

  it('Snapshot', () => {
    const trees = {
      full: getComponent(),
      noDescription: getComponent({description: ''})
    };

    Object.values(trees).forEach((treeToRender) => {
      const tree = renderer.create(treeToRender).toJSON()
      expect(tree).toMatchSnapshot();
    });
  });

  it('Testing the elements', () => {
    render(getComponent());
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByTestId('items-wrapper')).toBeInTheDocument();
    expect(screen.getAllByTestId('item').length).toBe(2);
  });

  it('Testing when rendering without a description', () => {
    render(getComponent({description: ''}));
    expect(screen.queryByTestId('description')).not.toBeInTheDocument();
  });

  it('Testing a selection of a single item', () => {
    render(getComponent());
    expect(selectHandler).not.toBeCalled();

    const [firstLink, secondLink] = screen.getAllByTestId('item');

    expect(firstLink.text).toBe('First option');
    expect(secondLink.text).toBe('Second option');

    clickOnLink(firstLink, {"0": true});

    // Verifying classes.
    expect(firstLink).toHaveClass('active');
    expect(secondLink).not.toHaveClass('active');

    clickOnLink(secondLink, {"1": true})

    // Verifying classes.
    expect(secondLink).toHaveClass('active');
    expect(firstLink).not.toHaveClass('active');

    // Testing the total number invocations.
    expect(selectHandler).toBeCalledTimes(2);
  });

  it('Testing selection of multiple elements', () => {
    render(getComponent({multiple: true}));
    expect(selectHandler).not.toBeCalled();

    const [firstLink, secondLink] = screen.getAllByTestId('item');

    expect(firstLink.text).toBe('First option');
    expect(secondLink.text).toBe('Second option');

    // Turn on both of the items.
    clickOnLink(firstLink, {"0": true});
    expect(firstLink).toHaveClass('active');
    expect(secondLink).not.toHaveClass('active');

    clickOnLink(secondLink, {"0": true, "1": true});
    expect(secondLink).toHaveClass('active');
    expect(firstLink).toHaveClass('active');

    // Click on the first item again and verify the classes.
    clickOnLink(firstLink, {"0": true});
    expect(firstLink).not.toHaveClass('active');
    expect(secondLink).toHaveClass('active');

    // Testing the total number invocations.
    expect(selectHandler).toBeCalledTimes(3);
  });
});
