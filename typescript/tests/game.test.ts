import {expect} from 'chai';
import {describe, it, beforeEach} from 'mocha';
import {Game} from "../src/game";

describe('trivia roll method test', () => {
    describe('When we roll the dice once', () => {
        let game;
        beforeEach(() => {
            game = new Game();
            game.add('Touraya');
            game.add('Noel');
            game.add('Carolyn');
        });

        it('should ask the first question', () => {
            //when
            let diceNumber = 6;
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
        describe('when we call the wrongAnswer method', () => {
            it('should send the player to the penaltyBox', () => {
                //given
                let diceNumber = 5;

                //when
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

    describe('When we roll the dice twice', () => {
        it('player get out of penality box and play until next question', () => {
            //given
            const game = new Game();
            let diceNumber = 5;

            //when
            game.add('Touraya');
            game.roll(diceNumber);
            game.wrongAnswer();
            game.roll(diceNumber);

            //then
            expect(game.messages).to.equal("Touraya was added\n" +
                "They are player number 1\n" +
                "Touraya is the current player\n" +
                "They have rolled a 5\n" +
                "Touraya's new location is 5\n" +
                "The category is Science\n" +
                "Science Question 0\n" +
                "Question was incorrectly answered\n" +
                "Touraya was sent to the penalty box\n" +
                "Touraya is the current player\n" +
                "They have rolled a 5\n" +
                "Touraya is getting out of the penalty box\n" +
                "Touraya's new location is 10\n" +
                "The category is Sports\n" +
                "Sports Question 0\n"
            );
        });

        it('player answer wronly to a question and then stay in penality box ', () => {
            //given
            const game = new Game();
            let diceNumber = 8;

            //when
            game.add('Touraya');
            game.roll(diceNumber);
            game.wrongAnswer();
            game.roll(diceNumber);

            //then
            expect(game.messages).to.equal("Touraya was added\n" +
                "They are player number 1\n" +
                "Touraya is the current player\n" +
                "They have rolled a 8\n" +
                "Touraya's new location is 8\n" +
                "The category is Pop\n" +
                "Pop Question 0\n" +
                "Question was incorrectly answered\n" +
                "Touraya was sent to the penalty box\n" +
                "Touraya is the current player\n" +
                "They have rolled a 8\n" +
                "Touraya is not getting out of the penalty box\n"
            );
        });
    });
});

describe('trivia wasCorrectlyAnswered method test', () => {
    it('player won 1 Gold coin when answered correctly', () => {
        //given
        const game = new Game();

        //when
        game.add('Touraya');
        game.wasCorrectlyAnswered();

        //then
        expect(game.messages).to.equal('Touraya was added\n' +
            'They are player number 1\n' +
            'Answer was correct!!!!\n' +
            'Touraya now has 1 Gold Coins.\n');
    });
    it('player is getting out of penallty box and won 1 gold coin when answerd correclty', () => {
        //given
        const game = new Game();
        let diceNumber = 5;

        //when
        game.add('Touraya');
        game.roll(diceNumber);
        game.wrongAnswer()
        game.roll(diceNumber);
        game.wasCorrectlyAnswered();


        //then
        expect(game.messages).to.equal("Touraya was added\n" +
            "They are player number 1\n" +
            "Touraya is the current player\n" +
            "They have rolled a 5\n" +
            "Touraya's new location is 5\n" +
            "The category is Science\n" +
            "Science Question 0\n" +
            "Question was incorrectly answered\n" +
            "Touraya was sent to the penalty box\n" +
            "Touraya is the current player\n" +
            "They have rolled a 5\n" +
            "Touraya is getting out of the penalty box\n" +
            "Touraya's new location is 10\n" +
            "The category is Sports\n" +
            "Sports Question 0\n" +
            "Answer was correct!!!!\n" +
            "Touraya now has 1 Gold Coins.\n");
    });

    it('player doesnot get out of penalty box', () => {
        //given
        const game = new Game();
        let diceNumber = 8;

        //when
        game.add('Touraya');
        game.roll(diceNumber);
        game.wrongAnswer();
        game.roll(diceNumber);
        game.wasCorrectlyAnswered();


        //then
        expect(game.messages).to.equal("Touraya was added\n" +
            "They are player number 1\n" +
            "Touraya is the current player\n" +
            "They have rolled a 8\n" +
            "Touraya's new location is 8\n" +
            "The category is Pop\n" +
            "Pop Question 0\n" +
            "Question was incorrectly answered\n" +
            "Touraya was sent to the penalty box\n" +
            "Touraya is the current player\n" +
            "They have rolled a 8\n" +
            "Touraya is not getting out of the penalty box\n");
    });

});