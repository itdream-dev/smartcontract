# Self Auditing 

1. Prevent overflow and underflow
   - authentcation checked (passed)
   - erc20 checked (passed)
     updated by using safemath
   - market checked (passed)
   - nft checked (passed)
    
2. Ensure that all relevant functions are marked with the correct visibility
   - erc20 checked (passed)
   - authentcation (passed)

3. Fix compiler warnings
   - erc20 no warnings (passed)
   - authentication no warnings (passed)
   - nft no warnings (passed)
   - market no warnings (passed)

4. External Calls - Every payable external contract call is a risk (reentrancy)
  - authentication checked (passed)  (only Owner functions)
  - erc20 checked (passed) 
    claimCreatingReward
  - market checked (passed)
    matchOrders  
  - nft checked (passed)     

5. Time Manipulation/Timestamp Dependence
   no Time Manipulation

6. Randomness
   no Randomness

7. Validate inputs of external/public functions
   (still checking)

8. Prevent unbounded loops
  - authentication checked (passed) 
  - erc20 checked (passed) 
  - market checked (passed)    
  - nft checked (passed)   

9. Superuser privileges
   (need to be checked)

10. Ownership of the deployed contract
  - Ownership can be transfered after deployment by owner. (updateProxyAdmin)