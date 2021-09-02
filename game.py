import random
import os

def clrscr():
  """ Clears the console in order to make a more pleasant game """
  if os.name == "posix":  # compatible with Unix/Linux/MacOS/BSD/etc
    os.system('clear')
  elif os.name in ("nt", "dos", "ce"):  # compatible with DOS/Windows
    os.system('CLS')

def play():
    WIN_LIST = [('ROCK', 'SCISSORS'),  # ROCK can defeated
                    ('SCISSORS', 'PAPER'),  # SCISSORS defeated
                    ('PAPER', 'ROCK')]  #  PAPER can defeated
    #  list of selections
    SELECTIONS_LIST = ['ROCK', 'PAPER', 'SCISSORS']
    
    status_count = {'player':0, 'computer':0, 'tie':0}
    while True:
        player_selection = input("Enter a choice {} : ".format(SELECTIONS_LIST))
        player_selection = player_selection.upper()
        
        if player_selection in SELECTIONS_LIST:
            clrscr() #clear screen
            computer_selection = random.choice(SELECTIONS_LIST)
            
            print("You choose {}, Computer choose {}\n".format(player_selection, computer_selection))
            
            match = player_selection, computer_selection  #  converts the player's and computer's selection into a tuple to compare it to win list
            
            if player_selection == computer_selection:  #  if both selections (player and computer) are the same, a tie count is added to the dictionary
                status_count['tie'] += 1
                print("\nYou chooce {}, Computer chooce {}! So that's a Tie!".format(player_selection, computer_selection))
            elif match in WIN_LIST:  #  if the tuple is the same as the win_list, player wins and a player count is added to the dictionary
                status_count['player'] += 1
                print("\nYou chooce {}, Computer chooce {}! You won!".format(player_selection, computer_selection))
            else: #  if none of the conditions above are true, computer wins and a computer count is added to the dictionary
                status_count['computer'] += 1
                print("\nYou chooce {}, Computer chooce {}! Computer won!".format(player_selection, computer_selection))
        
        
        print("Current Score(Player - Computer) : {} - {}".format(status_count['player'], status_count['computer']))
        
        if (status_count['player'] > 1)  and (status_count['player'] > status_count['computer']):
            print("You are win")
            status_count['player'] = 0
            status_count['computer'] = 0
            status_count['tie'] = 0
            exit()
        elif (status_count['computer'] > 1) and (status_count['computer'] > status_count['player']):
            print("Computer is the winner, please try again later")
            status_count['player'] = 0
            status_count['computer'] = 0
            status_count['tie'] = 0
            exit()
    
#begin program
play()