import {expect} from 'chai';
import {describe, it} from 'mocha';
import {GameRunner} from '../src/game-runner';
import {Game} from "../src/game";

describe('trivia', () => {
    describe('When we roll the dice', () => {
        it('the number should be between 2 and 12', () => {
            //given

            const game = new Game();
            let diceNumber = 6;

            //when

            game.add('Touraya');
            game.add('Noel');
            game.add('Carolyn');
            game.roll(diceNumber);

            //then

            expect(game.messages).to.equal('Touraya was added\n' +
                'They are player number 1\n' +
                'Noel was added\n' +
                'They are player number 2\n' +
                'Carolyn was added\n' +
                'They are player number 3\n' +
                'Touraya is the current player\n' +
                'They have rolled a 6\n' +
                'Touraya\'s new location is 6\n' +
                'The category is Sports\n' +
                'Sports Question 0\n');

        });

    });
    describe('When we roll the dice', () => {
        it('the number should be between 2 and 12', () => {
            //given

            const game = new Game();
            let diceNumber = 5;

            //when

            game.add('Touraya');
            game.add('Noel');
            game.add('Carolyn');
            game.roll(diceNumber);
            game.wrongAnswer();

            //then

            expect(game.messages).to.equal('Touraya was added\n' +
                'They are player number 1\n' +
                'Noel was added\n' +
                'They are player number 2\n' +
                'Carolyn was added\n' +
                'They are player number 3\n' +
                'Touraya is the current player\n' +
                'They have rolled a 5\n' +
                'Touraya\'s new location is 5\n' +
                'The category is Science\n' +
                'Science Question 0\n' +
                'Question was incorrectly answered\n' +
                'Touraya was sent to the penalty box\n'
            );

        });

    });
})

