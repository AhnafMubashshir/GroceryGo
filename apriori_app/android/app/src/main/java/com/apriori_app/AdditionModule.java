package com.apriori_app;

import android.util.Log;
import java.util.Set;
import java.util.Arrays;
import java.util.Iterator;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Collections;


public class AdditionModule extends ReactContextBaseJavaModule {
   AdditionModule(ReactApplicationContext context) {
       super(context);
   }

   @Override
   public String getName() {
       return "AdditionModule";
   }

   @ReactMethod
   public void addAlgo(ReadableArray data, int min_support, Promise promise){
        String[][] dataset = new String[data.size()][];
            for (int i = 0; i < data.size(); i++) {
                ReadableArray row = data.getArray(i);
                String[] transaction = new String[row.size()];
                for (int j = 0; j < row.size(); j++) {
                    transaction[j] = row.getString(j);
            }
            dataset[i] = transaction;
        }

        Map<String, Integer> itemCount = new HashMap<>();
        for (String[] transaction : dataset) {
            for (String item : transaction) {
                if (!item.isEmpty()) {
                    if (itemCount.containsKey(item)) {
                        itemCount.put(item, itemCount.get(item) + 1);
                    } else {
                        itemCount.put(item, 1);
                    }
                }
            }
        }

        Set<String> frequentItems = new HashSet<>();
        for (Map.Entry<String, Integer> entry : itemCount.entrySet()) {
            double support = entry.getValue() * 1.0 / dataset.length;
            if (support >= min_support) {
                frequentItems.add(entry.getKey());
            }
        }

        // Iterator<String> iterator = frequentItems.iterator();
        // String firstItem = null;
        // if (iterator.hasNext()) {
        //     firstItem = iterator.next();
        // }

        Map<Set<String>, Integer> frequentItemsets = new HashMap<>();
        // for (int i = 2; frequentItems.size() <; i++) {
        for (int i = 2; i<5 ; i++) {
            Set<Set<String>> candidateItemsets = generateCandidateItemsets(frequentItems, i);
            frequentItems.clear();
            for (String[] transaction : dataset) {
                Set<String> items = new HashSet<>();
                for (String item : transaction) {
                    if (frequentItemsets.keySet().contains(Collections.singleton(item))) {
                        items.add(item);
                    }
                }

                for (Set<String> candidateItemset : candidateItemsets) {
                    if (containsAllItems(transaction, candidateItemset)) {
                        if (frequentItemsets.containsKey(candidateItemset)) {
                            frequentItemsets.put(candidateItemset, frequentItemsets.get(candidateItemset) + 1);
                        } else {
                            frequentItemsets.put(candidateItemset, 1);
                        }
                    }
                }
            }
        }


        for (Map.Entry<Set<String>, Integer> entry : frequentItemsets.entrySet()) {
            double support = entry.getValue() * 1.0 / dataset.length;
            if (support >= min_support) {
                frequentItems.addAll(entry.getKey());
                promise.resolve(entry.getKey().toString());
            }
        }

   }

    private Set<Set<String>> generateCandidateItemsets(Set<String> frequentItems, int k) {
    Set<Set<String>> candidateItemsets = new HashSet<>();
    for (String item : frequentItems) {
        Set<String> itemset = new HashSet<>();
        itemset.add(item);
        candidateItemsets.add(itemset);
    }

    while (true) {
        Set<Set<String>> newCandidates = new HashSet<>();
        for (Set<String> itemset : candidateItemsets) {
            for (String item : frequentItems) {
                if (!itemset.contains(item)) {
                    Set<String> newCandidate = new HashSet<>(itemset);
                    newCandidate.add(item);
                    if (newCandidate.size() == k) {
                        newCandidates.add(newCandidate);
                    }
                }
            }
        }
        if (newCandidates.isEmpty()) {
            break;
        } else {
            candidateItemsets = newCandidates;
        }
    }

    return candidateItemsets;
    }

    private boolean containsAllItems(String[] transaction, Set<String> itemset) {
        for (String item : itemset) {
            if (!Arrays.asList(transaction).contains(item)) {
                return false;
            }
        }
        return true;
    }
}
