const _ = require('underscore');

const DrawCard = require('../../drawcard.js');

class Ashemark extends DrawCard {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onPhaseStarted: () => this.hasToken('gold')
            },
            cost: [
                ability.costs.kneelSelf(),
                ability.costs.sacrificeSelf()
            ],
            handler: context => {
                _.each(this.game.getPlayers(), player => {
                    let characters = player.filterCardsInPlay(card => card.getType() === 'character' && card.getPrintedCost() <= context.cardStateWhenInitiated.tokens.gold);
                    _.each(characters, card => {
                        card.owner.returnCardToHand(card);
                    });
                });

                this.game.addMessage('{0} kneels and sacrifices {1} to return each character with printed cost {2} or less to its owner\'s hand',
                    this.controller, this, context.cardStateWhenInitiated.tokens.gold);
            }
        });
    }
}

Ashemark.code = '08011';

module.exports = Ashemark;
