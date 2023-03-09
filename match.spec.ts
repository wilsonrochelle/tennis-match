import { assert } from "chai";
import { Match } from './match';
 
describe("Tennis match tests", () => {
   it("score should be 0 before starting the match", () => {
      const expected = '0-0';
      const match = new Match('Abby', 'Alister');
      const result = match.score();
      assert.equal(result, expected);
   });

   it("player should be able to score a point", () => {
      const expected = '0-0, 15-0';
      const match = new Match('Abby', 'Alister');
      match.pointWonBy('Abby');
      const result = match.score();
      assert.equal(result, expected);
   });

   it("player should be able to win a game", () => {
      const expected = '1-0';
      const match = new Match('Abby', 'Alister');
      match.pointWonBy('Abby');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      const result = match.score();
      assert.equal(result, expected);
   });

   it("players should be able to get a deuce", () => {
      const expected = '0-0, deuce';
      const match = new Match('Abby', 'Alister');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      const result = match.score();
      assert.equal(result, expected);
   });

   it("player should be able to get an advantage, then win set", () => {
      const match = new Match('Abby', 'Alister');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      const result1 = match.score();
      assert.equal(result1, '0-0, advantage Alister');
      
      match.pointWonBy('Alister');
      const result2 = match.score();
      assert.equal(result2, '0-1');
   });

   it("player should be able to get a deuce, advantage, deuce, advantage, win set", () => {
      const match = new Match('Abby', 'Alister');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      const result1 = match.score();   
      assert.equal(result1, '0-0, deuce');

      match.pointWonBy('Alister');
      const result2 = match.score();   
      assert.equal(result2, '0-0, advantage Alister');
   
      match.pointWonBy('Abby');
      const result3 = match.score();  
      assert.equal(result3, '0-0, deuce');
   
      match.pointWonBy('Abby');
      const result4 = match.score();  
      assert.equal(result4, '0-0, advantage Abby');

      match.pointWonBy('Abby');
      const result5 = match.score(); 
      assert.equal(result5, '1-0');
   });

   it("player should be able to win a match 6-0", () => {
      const expected = '6-0, well done Abby';
      const match = new Match('Abby', 'Alister');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      const result = match.score();
      assert.equal(result, expected);
   });

   it("player should be able to win a match 7-5", () => {
      const expected = '5-7, well done Alister';
      const match = new Match('Abby', 'Alister');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      const result = match.score();
      assert.equal(result, expected);
   });

   it("players should get tie break", () => {
      const expected = '6-6, tie break required';
      const match = new Match('Abby', 'Alister');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      const result = match.score();
      assert.equal(result, expected);
   });

   it("player should be able to win match and tie breaker by winning all 7 tie breaker points", () => {
      const expected = '6-7, well done Alister';
      const match = new Match('Abby', 'Alister');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      const result = match.score();
      assert.equal(result, expected);
   });

   it("player should be able to win match and tie breaker by winning by a margin of two", () => {
      const expected = '6-7, well done Alister';
      const match = new Match('Abby', 'Alister');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');
      match.pointWonBy('Abby');

      match.pointWonBy('Alister');
      match.pointWonBy('Alister');
      match.pointWonBy('Alister');

      const result = match.score();
      assert.equal(result, expected);
   });
});
